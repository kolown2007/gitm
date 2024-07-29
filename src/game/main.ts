import { Boot } from './scenes/Boot';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { scene1} from './scenes/scene1';
import { scene2} from './scenes/scene2';
import { scene3} from './scenes/scene3';
import { scene4} from './scenes/scene4';
import { scene5} from './scenes/scene5';
import { scene6} from './scenes/scene6';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        scene1,
        scene2,
        scene3,
        scene4,
        scene5,
        scene6

    ]
};

const StartGame = (parent: string) => {
    const game = new Game({ ...config, parent });

    window.addEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    });

    return game;
}

export default StartGame;
