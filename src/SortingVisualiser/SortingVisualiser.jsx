import React from 'react';
import './SortingVisualiser.css';
import mergeSort from '../SortingAlgorithms/sortingAlgorithms';



export default class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i<200; i++){
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = mergeSort(this.state.array);
        const newAnimations = [];
        for (const animation of animations){
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.swap);
        }
        for(let i=0; i< animations.length; i++) {
            const {comparison, swap} = animations[i];
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                arrayBars[comparison[1]].style.backgroundColor = 'red';
                arrayBars[comparison[0]].style.backgroundColor = 'red';
                setTimeout(() => {
                    arrayBars[comparison[1]].style.backgroundColor = 'turqoise';
                    arrayBars[comparison[0]].style.backgroundColor = 'turqoise';
                }, (i+1) * 10);
            
            }, i+ 10);
        }
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testSortingAlgorithms() {
        for(let i=0; i< 100; i++){
            const array = [];
            const length = randomIntFromInterval(1,1000);
            for (let i=0; i< length; i++){
                array.push(randomIntFromInterval(-1000,1000));
            }
            const javaScriptSortedArray = array.slice().sort((a,b) => a-b);
            const mergeSortedArray = mergeSort(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{height: `${value}px`}}></div>
            ))}
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo){
    if(arrayOne.length !== arrayTwo.length) return false;
    for(let i=0; i < arrayOne.length; i++){
        if(arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}