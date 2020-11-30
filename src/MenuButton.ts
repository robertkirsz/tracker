import styled from 'styled-components'

type Props = {
  size?: number
  color?: string
}

const defaultProps: Props = {
  size: 30,
  color: 'currentColor ',
}

const MenuButton = styled.button<Props>`
  ${({ size, color }) => `
    width: ${size}px;
    height: ${size}px;
    background-image: radial-gradient(${color} 40%, transparent 40%);
  `}

  background-color: transparent;
  background-repeat: repeat-y;
  background-size: 33.33% 33.33%;
  background-position: center;
  border: none;
  outline: none;
  cursor: pointer;
  color: inherit;
`

MenuButton.defaultProps = defaultProps

export default MenuButton
