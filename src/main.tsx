import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { FluentProvider } from '@fluentui/react-components'
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { PartialTheme, ThemeProvider } from '@fluentui/react';
initializeIcons();

const customTheme: PartialTheme = {
  palette: {
    themePrimary: '#c1af88',
    // themeDark: '#c1af88',
    // themeLight: '#c1af88',
    // themeLighter: '#c1af88',
    // themeSecondary: '#c1af88',
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FluentProvider>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </FluentProvider>,
)
