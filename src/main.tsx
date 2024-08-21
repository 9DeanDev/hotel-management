import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { FluentProvider } from '@fluentui/react-components'
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { PartialTheme, ThemeProvider } from '@fluentui/react';
initializeIcons();

const customTheme: PartialTheme = {
  palette: {
    themePrimary: 'rgb(219 194 140)',
    themeDark: 'rgb(219 194 140)',
    themeLight: 'rgb(219 194 140)',
    themeLighter: 'rgb(219 194 140)',
    themeSecondary: 'rgb(219 194 140)',
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FluentProvider>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </FluentProvider>,
)
