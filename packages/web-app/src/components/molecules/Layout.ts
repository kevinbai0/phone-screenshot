import {injectDNA, styled} from '@kbai/design-system';
import { Box } from "../atoms/Box";

export const Layout = styled(Box)`
  ${props => injectDNA(props, {
    m: 0
  })}
`