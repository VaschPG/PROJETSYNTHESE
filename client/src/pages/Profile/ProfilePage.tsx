import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css'; 
import PersonalInfo from './components/PersonalInfo';
import ProgressChart from './components/ProgressChart';
import Goals from './components/Goals';

function ProfilePage() {
    return (
        <div className="profile-page">
            <nav className="navbar">
                <h1>Votre Profil</h1>
                <Link to="/">Entrainement</Link>
            </nav>
            <div>
                <PersonalInfo />
                <ProgressChart />
                <Goals />
            </div>
        </div>
    );
}

export default ProfilePage;