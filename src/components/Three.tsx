import React, {useEffect, useState} from 'react';
import './ExploreContainer.css';

import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {ColladaLoader} from 'three/examples/jsm/loaders/ColladaLoader';

interface ContainerProps {
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    const [camera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();

    useEffect(() => {
        camera.position.set(0, 0, 25);
        camera.lookAt(0, 0, 0);


        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        (document.getElementById("qwer") || document.body).appendChild(renderer.domElement);

        const light = new THREE.AmbientLight('#ffffff'); // soft white light
        scene.add(light);

        const loaderGLTF = new GLTFLoader();
        const loader = new ColladaLoader();
        const animationLoader = new THREE.AnimationLoader();
        let model: THREE.Object3D;
        let mixer: THREE.AnimationMixer | null;
        loader.load('cube_anim.dae', function (gltf) {
            console.dir(gltf.animations)


            gltf.scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.material.side = THREE.DoubleSide;
                    node.geometry.center();
                }
            });

            model = gltf.scene.children[0];
            model.scale.set(1, 1, 1);
            // model.rotation.x = 3;
            // model.position.z = 20;
            // scene.add(model);
            console.log(gltf.scene.children);
            // gltf.scene.children.forEach(m => {
            //     scene.add(m)
            // })

            scene.add(model);

            loader.load('anim.dae', function (object) {
                // let object = gltf;
                console.log(object)
                if (object.animations && object.animations.length) {
                    mixer = new THREE.AnimationMixer(model);
                    mixer.clipAction(object.animations[0]).play();
                }
            })

        }, undefined, function (error) {
            console.error(error);
        });


        // const geometry = new THREE.BoxGeometry(10, 10, 10);
        // const material = new THREE.MeshBasicMaterial({color: '#56c4a3', wireframe: true});
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);
        //
        // const geometryS = new THREE.SphereGeometry(5, 32, 32);
        // const materialS = new THREE.MeshNormalMaterial();
        // const sphere = new THREE.Mesh(geometryS, materialS);
        // scene.add(sphere);

        renderer.render(scene, camera);

        function render() {
            requestAnimationFrame(render);
            const delta = clock.getDelta();
            if (mixer != null) {
                mixer.update(delta);
            }
            renderer.render(scene, camera);
        }

        render();

        window.addEventListener('keydown', rotate)

        return () => window.removeEventListener('keydown', rotate)
    }, [])
    // l - 37
    // r -39
    // u- 38
    // d-40
    // rotation - 82
    // x - 88
    // y - 89
    // z - 90
    function rotate(e: any) {
        switch (e.keyCode) {
            case  65:
            case  37:
                camera.position.x -= 1;
                break;
            case  68:
            case  39:
                camera.position.x += 1;
                break;
            case  87:
            case  38:
                camera.position.z += 1;
                break;
            case  83:
            case  40:
                camera.position.z -= 1;
                break;
            case 82:
                camera.rotation.z += 0.005;
                break;
        }
    }

    function wheel(e: any) {
        console.log(camera.position.z)
        if (camera) {
            if (e.deltaY > 0) camera.position.y += 1;
            else camera.position.y -= 1;
        }
    }

    return (
        <div id="qwer" className="container" onWheel={wheel}/>
    );
};

export default ExploreContainer;
