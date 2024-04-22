import React from 'react'
import * as Styled from './styled'

type Props = {
  icon: any
  style?: React.CSSProperties
}
const BlueIconComp: React.FC<Props> = ({
  icon,
  style = { marginRight: '10px' },
}) => {
  return <Styled.IconBlock style={style}>{icon}</Styled.IconBlock>
}
export default BlueIconComp
