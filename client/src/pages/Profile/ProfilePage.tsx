import React from 'react';
import './ProfilePage.css';
import PersonalInfo from './components/PersonalInfo';
import ProgressChart from './components/ProgressChart';
import Goals from './components/Goals';

function ProfilePage() {
    const handleSubmit = (formData: any) => { 
        console.log('FormData:', formData);
        alert('Les données ont été soumises avec succès !'); 
    };

    return (
        <div className='profile-page'>
            <div className='navbar'>
                <h1>Votre Profil</h1>
            </div>
            <div className='profile-sections'>
                <div className='left-section'>
                    <div className='left-section-top'>
                        <PersonalInfo />
                    </div>
                    <div className='left-section-bottom'>
						<h1 className='h1'>Progression</h1>
                        <ProgressChart />
                    </div>
                </div>
                <div className='right-section'>
					<h1 className='h1'>Vos objectifs</h1>
                    <Goals />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;