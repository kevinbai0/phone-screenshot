import React from 'react';
import { ThemeProvider, createTheme } from '@kbai/design-system'

const theme = createTheme({});
export default ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}
