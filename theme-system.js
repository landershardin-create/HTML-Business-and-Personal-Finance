// theme-system.js
// Reactive theme engine for Business + Personal Finance dashboard.
// Applies CSS variables, persists theme selection, and updates UI components.

import State from '../data/state.js';
import Telemetry from '../system/telemetry.js';

export const ThemeSystem = {

    /* ---------------------------------------------------------
     * AVAILABLE THEMES
     * --------------------------------------------------------- */
    themes: {
        dark: {
            '--bg': '#0f0f0f',
            '--panel-bg': '#1a1a1a',
            '--text': '#ffffff',
            '--accent': '#4da3ff',
            '--danger': '#ff4d4d',
            '--success': '#4dff88'
        },
        light: {
            '--bg': '#ffffff',
            '--panel-bg': '#f4f4f4',
            '--text': '#000000',
            '--accent': '#0066cc',
            '--danger': '#cc0000',
            '--success': '#009933'
        },
        cobalt: {
            '--bg': '#001933',
            '--panel-bg': '#00264d',
            '--text': '#e6f2ff',
            '--accent': '#3399ff',
            '--danger': '#ff6666',
            '--success': '#66ffb3'
        }
    },

    /* ---------------------------------------------------------
     * APPLY THEME
     * --------------------------------------------------------- */
    apply(themeName) {
        const theme = this.themes[themeName];

        if (!theme) {
            Telemetry.error('theme:unknown', { themeName });
            return;
        }

        const root = document.documentElement;

        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        // Persist theme selection
        State.update('settings', {
            ...State.get('settings'),
            theme: themeName
        });

        Telemetry.log('theme:applied', {
            theme: themeName,
            timestamp: Date.now()
        });
    },

    /* ---------------------------------------------------------
     * INITIALIZE THEME (On Load)
     * --------------------------------------------------------- */
    init() {
        const settings = State.get('settings');
        const themeName = settings.theme || 'dark';

        this.apply(themeName);

        Telemetry.log('theme:init', {
            theme: themeName,
            timestamp: Date.now()
        });
    },

    /* ---------------------------------------------------------
     * REACTIVE THEME SWITCHING
     * --------------------------------------------------------- */
    bindSwitcher() {
        document.querySelectorAll('[data-theme]').forEach(btn => {
            btn.addEventListener('click', e => {
                const themeName = e.target.getAttribute('data-theme');
                this.apply(themeName);

                Telemetry.log('theme:switch', {
                    theme: themeName,
                    timestamp: Date.now()
                });
            });
        });
    }
};

export default ThemeSystem;