import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
}

const Title = styled.div`
  width: 100%;
  height: 60px;
  background: white;
  font-size: 22px;
  font-weight: 500;
  line-height: 60px;
  padding: 0 50px;
  box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px, rgb(17 17 26 / 10%) 0px 8px 24px,
    rgb(17 17 26 / 10%) 0px 16px 48px;
`

function PageTitle({ title }: Props) {
  return <Title>{title}</Title>
}

export default PageTitle
