// @ts-nocheck
import styled, { css } from 'styled-components'

function withUnit(value: number | string) {
  return typeof value === 'number' ? value + 'px' : value
}

const layerStyles = 'position: absolute; top: 0; right: 0; bottom: 0; left: 0;'

const stuff = {
  // flex-direction
  row: 'flex-direction: row;',
  rowReverse: 'flex-direction: row-reverse;',
  column: 'flex-direction: column;',
  columnReverse: 'flex-direction: column-reverse;',
  wraps: 'flex-wrap: wrap;',
  // justify-content
  justifyStart: 'justify-content: flex-start;',
  justifyEnd: 'justify-content: flex-end;',
  justifyCenter: 'justify-content: center;',
  justifyBetween: 'justify-content: space-between;',
  justifyAround: 'justify-content: space-around;',
  justifyEvenly: 'justify-content: space-evenly;',
  // align-items
  itemsStart: 'align-items: flex-start;',
  itemsEnd: 'align-items: flex-end;',
  itemsCenter: 'align-items: center;',
  itemsBaseline: 'align-items: baseline;',
  itemsStretch: 'align-items: stretch;',
  // align-content
  contentStart: 'align-content: flex-start;',
  contentEnd: 'align-content: flex-end;',
  contentCenter: 'align-content: center;',
  contentBetween: 'align-content: space-between;',
  contentAround: 'align-content: space-around;',
  contentStretch: 'align-content: stretch;',
  // Self-positioning
  flex: value => `flex: ${value};`,
  flexNone: 'flex: none;',
  selfAuto: 'align-self: auto;',
  selfStart: 'align-self: flex-start;',
  selfEnd: 'align-self: flex-end;',
  selfCenter: 'align-self: center;',
  selfBaseline: 'align-self: baseline;',
  selfStretch: 'align-self: stretch;',
  // Size
  width: value => `width: ${withUnit(value)};` /* Tested */,
  height: value => `height: ${withUnit(value)};` /* Tested */,
  minWidth: value => `min-width: ${withUnit(value)};` /* Tested */,
  minHeight: value => `min-height: ${withUnit(value)};` /* Tested */,
  maxWidth: value => `max-width: ${withUnit(value)};` /* Tested */,
  maxHeight: value => `max-height: ${withUnit(value)};` /* Tested */,
  // Margin
  margin: value => `margin: ${withUnit(value)};` /* Tested */,
  marginTop: value => `margin-top: ${withUnit(value)};` /* Tested */,
  marginRight: value => `margin-right: ${withUnit(value)};` /* Tested */,
  marginBottom: value => `margin-bottom: ${withUnit(value)};` /* Tested */,
  marginLeft: value => `margin-left: ${withUnit(value)};` /* Tested */,
  mTop: value => `margin-top: ${withUnit(value)};`,
  mRight: value => `margin-right: ${withUnit(value)};`,
  mBottom: value => `margin-bottom: ${withUnit(value)};`,
  mLeft: value => `margin-left: ${withUnit(value)};`,
  // Padding
  padding: value => `padding: ${withUnit(value)};` /* Tested */,
  paddingTop: value => `padding-top: ${withUnit(value)};` /* Tested */,
  paddingRight: value => `padding-right: ${withUnit(value)};` /* Tested */,
  paddingBottom: value => `padding-bottom: ${withUnit(value)};` /* Tested */,
  paddingLeft: value => `padding-left: ${withUnit(value)};` /* Tested */,
  pTop: value => `padding-top: ${withUnit(value)};`,
  pRight: value => `padding-right: ${withUnit(value)};`,
  pBottom: value => `padding-bottom: ${withUnit(value)};`,
  pLeft: value => `padding-left: ${withUnit(value)};`,
  // Background
  background: value => `background: ${value};`,
  backgroundImage: value => `background-image: url(${value});`,
  cover: 'background-size: cover;',
  contain: 'background-size: contain;',
  // Border
  border: value => `border: ${value};` /* Tested */,
  radius: value => `border-radius: ${withUnit(value)};` /* Tested */,
  // Position
  relative: 'position: relative;',
  absolute: 'position: absolute;',
  fixed: 'position: fixed;',
  sticky: 'position: sticky;',
  top: value => `top: ${withUnit(value)};`,
  right: value => `right: ${withUnit(value)};`,
  bottom: value => `bottom: ${withUnit(value)};`,
  left: value => `left: ${withUnit(value)};`,
  z: value => `z-index: ${value};`,
  // Text
  font: value => `font: ${value};` /* Tested */,
  fontFamily: value => `font-family: ${value};` /* Tested */,
  fontSize: value => `font-size: ${withUnit(value)};` /* Tested */,
  fontWeight: value => `font-weight: ${value};` /* Tested */,
  lineHeight: value => `line-height: ${value};` /* Tested */,
  letterSpacing: value => `letter-spacing: ${withUnit(value)};` /* Tested */,
  textAlign: value => `text-align: ${value};` /* Tested */,
  color: value => `color: ${value};` /* Tested */,
  // Lists
  listLeft: value => `> *:not(:first-child) { margin-left: ${withUnit(value === true ? 8 : value)}; }`,
  listRight: value => `> *:not(:last-child) { margin-right: ${withUnit(value === true ? 8 : value)}; }`,
  listTop: value => `> *:not(:first-child) { margin-top: ${withUnit(value === true ? 8 : value)}; }`,
  listBottom: value => `> *:not(:last-child) { margin-bottom: ${withUnit(value === true ? 8 : value)}; }`,
  columnTop: value =>
    `flex-direction: column; > *:not(:first-child) { margin-top: ${withUnit(value === true ? 8 : value)}; }`,
  columnBottom: value =>
    `flex-direction: column; > *:not(:last-child) { margin-bottom: ${withUnit(value === true ? 8 : value)}; }`,
  // Other
  overflow: value => `overflow: ${value};` /* Tested */,
  // Helpers
  layer: layerStyles,
  square: value => value !== '' && `width: ${withUnit(value)}; height: ${withUnit(value)};`,
  fullHeight: 'min-height: 100vh;',
  hide: 'display: none;',
  circle: 'border-radius: 50%;',
  clickable: 'cursor: pointer;',
  noPointerEvents: 'pointer-events: none;',
  overlay: (value = 'red', props) => `
  position: ${(props.absolute && 'absolute') || 'relative'};
  &::after {
    content: "";
    ${layerStyles}
    background: ${value};
    opacity: 0.2;
    pointer-events: none;
  }`,
}

function camelToKebab(value: string) {
  if (typeof value !== 'string') return value
  return value.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

function memoize(func) {
  const cache = {}

  return (...args) => {
    const item = args[0]

    if (item in cache) {
      return cache[item]
    } else {
      const result = func(item)
      cache[item] = result
      return result
    }
  }
}

const isDivProp = memoize(item => Object.keys(stuff).includes(item))

function createCss(props) {
  return (previous, current) => {
    const stuffValue = stuff[current]
    const propValue = props[current]
    if (typeof stuffValue === 'string' && propValue) return `${previous}${stuffValue}`
    if (typeof stuffValue === 'function') return `${previous}${stuffValue(propValue, props)}`
    return previous
  }
}

function doStuff(props) {
  return Object.keys(props).filter(isDivProp).reduce(createCss(props), '')
}

function doMediaQueriesStuff(props = {}) {
  const { styledKitMediaQueries = {} } = props.theme || {}
  const queryNames = Object.keys(styledKitMediaQueries)

  if (!queryNames.length) return

  const queryNameToValuesMap = queryNames.reduce((all, query) => {
    const declaration = props[query]

    if (!declaration) return all

    if (typeof declaration === 'string') return { ...all, [query]: declaration }

    if (Array.isArray(declaration)) {
      return {
        ...all,
        [query]: declaration.reduce((all, property) => {
          const stuffProperty = stuff[property]
          if (typeof stuffProperty !== 'string') return all
          return `${all}${stuffProperty}`
        }, ''),
      }
    }

    return {
      ...all,
      [query]: Object.keys(declaration).reduce((all, property) => {
        const value = declaration[property]
        const stuffProperty = stuff[property]
        if (value === false) return all
        if (!stuffProperty) return `${all}${camelToKebab(property)}:${value};`
        return `${all}${typeof stuffProperty === 'function' ? stuffProperty(value, props) : stuffProperty}`
      }, ''),
    }
  }, {})

  // prettier-ignore
  return queryNames.reduce(
    (all, query) =>
      !queryNameToValuesMap[query]
        ? all
        : css`${all} ${styledKitMediaQueries[query]`${queryNameToValuesMap[query]}`}`, ''
  )
}

type DivProps = {
  // Display
  inline?: boolean
  // flex-direction
  row?: boolean
  rowReverse?: boolean
  column?: boolean
  columnReverse?: boolean
  wraps?: boolean
  // justify-content
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyCenter?: boolean
  justifyBetween?: boolean
  justifyAround?: boolean
  justifyEvenly?: boolean
  // align-items
  itemsStart?: boolean
  itemsEnd?: boolean
  itemsCenter?: boolean
  itemsBaseline?: boolean
  itemsStretch?: boolean
  // align-content
  contentStart?: boolean
  contentEnd?: boolean
  contentCenter?: boolean
  contentBetween?: boolean
  contentAround?: boolean
  contentStretch?: boolean
  // Self-positioning
  flex?: number | string
  flexNone?: boolean
  selfAuto?: boolean
  selfStart?: boolean
  selfEnd?: boolean
  selfCenter?: boolean
  selfBaseline?: boolean
  selfStretch?: boolean
  // Size
  width?: number | string
  height?: number | string
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
  // Margin
  margin?: number | string
  marginTop?: number | string
  marginRight?: number | string
  marginBottom?: number | string
  marginLeft?: number | string
  mTop?: number | string
  mRight?: number | string
  mBottom?: number | string
  mLeft?: number | string
  // Padding
  padding?: number | string
  paddingTop?: number | string
  paddingRight?: number | string
  paddingBottom?: number | string
  paddingLeft?: number | string
  pTop?: number | string
  pRight?: number | string
  pBottom?: number | string
  pLeft?: number | string
  // Background
  background?: string
  backgroundImage?: string
  cover?: boolean
  contain?: boolean
  // Border
  border?: string
  radius?: number | string
  // Position
  relative?: boolean
  absolute?: boolean
  fixed?: boolean
  sticky?: boolean
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
  z?: number | string
  // Text
  font?: string
  fontFamily?: string
  fontSize?: number | string
  fontWeight?: number | string
  lineHeight?: number | string
  letterSpacing?: number | string
  textAlign?: string
  color?: string
  // Lists
  listLeft?: boolean | number | string
  listRight?: boolean | number | string
  listTop?: boolean | number | string
  listBottom?: boolean | number | string
  columnTop?: boolean | number | string
  columnBottom?: boolean | number | string
  // Other
  overflow?: string
  // Helpers
  layer?: boolean
  square?: number | string
  fullHeight?: boolean
  hide?: boolean
  circle?: boolean
  clickable?: boolean
  noPointerEvents?: boolean
  overlay?: string
}

export default styled.div<DivProps>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  ${doStuff}
  ${doMediaQueriesStuff}
`
