
import React from 'react';
import type { Language } from '../types';

interface HeaderProps {
    currentLang: Language;
    toggleLanguage: () => void;
    i18n: {
        app_title: string;
        app_subtitle: string;
    };
}

const Header: React.FC<HeaderProps> = ({ currentLang, toggleLanguage, i18n }) => {
    return (
        <header className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white">{i18n.app_title}</h1>
                <p className="text-base text-gray-300 mt-3">{i18n.app_subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleLanguage}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 transform hover:scale-105 bg-gray-800/80 text-gray-100 hover:bg-gray-700 focus:ring-gray-400 text-base"
                >
                    EN / KO
                </button>
            </div>
        </header>
    );
};

export default Header;
