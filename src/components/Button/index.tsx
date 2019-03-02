import React from 'react'

import Icon from 'src/components/Icons'
import {
  ColorProps,
  SpaceProps,
  WidthProps,
  ButtonStyleProps,
} from 'styled-system'
import { StyledButton, Label } from './elements'

// extend to allow any default button props (e.g. onClick) to also be passed
interface IBtnProps extends React.ButtonHTMLAttributes<HTMLElement> {
  icon?: string
}

type BtnProps = IBtnProps &
  SpaceProps &
  WidthProps &
  ButtonStyleProps &
  ColorProps

export const Button = (props: BtnProps) => (
  <StyledButton {...props}>
    {props.icon && <Icon glyph={props.icon} />}
    <Label>{props.children}</Label>
  </StyledButton>
)
