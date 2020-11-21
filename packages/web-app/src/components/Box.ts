import {DNA, injectDNA, styled} from '@kbai/design-system';

export const Box = styled.div<DNA>`
  ${props => injectDNA(props, {
    display: 'col'
  })}
`
