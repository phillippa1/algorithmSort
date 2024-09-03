import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualiser.css';
import { mergeSort } from '../SortingAlgorithms/sortingAlgorithms.js';

const   ANIMATION_SPEED_MS = 3;

const NUMBER_OF_ARRAY_BARS = 310;

export default class SortingVisualiser extends React.Component {
    //initialises the comonent's state
    constructor(props) {
        super(props);

        this.state = {
            //intialises the array with an empty array
            array: [],
        };
    }

    //generates a new array when the page is loaded
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i< NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(5, 730));
        }
        //updates the component with this array
        this.setState({array});
    }

    mergeSort() {
        // Get the merge sort animations
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        // Loop through the animations and update the array bars accordingly
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                // Changing the color of the bars being compared
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                // Updating the height of the bars to reflect sorted order
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    // After the height update, mark this bar as correctly positioned
                    barOneStyle.backgroundColor = 'turquoise';
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testSortingAlgorithms() {
        //does 100 iterations of testing sorting algorithms 
        for(let i=0; i< 100; i++){
            const array = [];
            const length = randomIntFromInterval(1,1000);
            //generates a new array
            for (let i=0; i< length; i++){
                array.push(randomIntFromInterval(-1000,1000));
            }
            const origionalArray = array.slice();
            //sort the array using JavaScript's built in sort function
            const javaScriptSortedArray = origionalArray.slice().sort((a,b) => a-b);
            //sort the array using the merge sort function
            const mergeSortedArray = mergeSort(array);
            //compare the two sorted arrays
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


//for the testing sorting algorithms
function arraysAreEqual(arrayOne, arrayTwo) {
    if (!arrayOne || !arrayTwo) return false; // Check if either array is undefined
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}