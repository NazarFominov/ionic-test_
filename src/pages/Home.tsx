import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import Three from '../components/Three';
import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Тренировочка</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Тренировочка</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Three/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
