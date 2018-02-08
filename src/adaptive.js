import css from 'css'

const PX_REG = /\b(\d+(\.\d+)?)px\b/
const RPX_REG = /\b(\d+(\.\d+)?)rpx\b/
// const PX_GLOBAL_REG = new RegExp(PX_REG.source, 'g')
const RPX_GLOBAL_REG = new RegExp(RPX_REG.source, 'g')

export default class Adaptive {
  constructor (options, result) {
    const defaultConfig = {
      baseDpr: 2,                 // Dpr (default: 2)
      remUnit: 75,                // 设计稿 750px
      remPrecision: 6            // rem计算精确度
    }
    this.result = result
    this.config = Object.assign({}, defaultConfig, options)
  }
  // CSS 转换
  parse (code) {
    const astObj = css.parse(code)
    this._processRules(astObj.stylesheet.rules)
    return css.stringify(astObj)
  }
  // 寻找所有的rules
  _processRules (rules) {
    this.result.warn(rules.length)
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      const ruleType = rule.type
      if (ruleType === 'media' || ruleType === 'supports') {
        this._processRules(rule.rules) // recursive invocation while dealing with media queries
        continue
      }
      else if (ruleType === 'keyframes') {
        this._processRules(rule.keyframes, true) // recursive invocation while dealing with keyframes
        continue
      }
      else if (ruleType !== 'rule' && ruleType !== 'keyframe') {
        continue
      }
      const declarations = rule.declarations
      for (let j = 0; j < declarations.length; j++) {
        const declaration = declarations[j]
        // PX 单位的 不转换  ／ rpx 单位的转换
        if (declaration.type === 'declaration' && RPX_REG.test(declaration.value)) {
          const mode = 'rem'
          declaration.value = this._getCalcValue(mode, declaration.value)
        }
        else if (declaration.type === 'declaration' && PX_REG.test(declaration.value)) {
          const mode = 'px'
          declaration.value = this._getCalcValue(mode, declaration.value)
        }
      }
    }
  }

  _getCalcValue (type, value, isHairline = false) {
    const { baseDpr, remUnit, remPrecision } = this.config
    function getValue (val, curType = type) {
      val = parseFloat(val.toFixed(remPrecision))
      return val === 0 ? val : val + curType
    }
    return value.replace(RPX_GLOBAL_REG, ($0, $1) => {
      $1 = Number($1)
      return $1 === 0 ? 0 :
        type === 'rem' && $1 / baseDpr > 0.5 ? getValue($1 / remUnit) :
        !isHairline && $1 / baseDpr < 1 ? getValue($1, 'px') :
        getValue($1 / baseDpr > 0.5 ? $1 / baseDpr : 0.5, 'px')
    })
  }
}
