import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualiser.css';
import { mergeSort } from '../SortingAlgorithms/sortingAlgorithms.js';
import { getQuickSortAnimations } from '../SortingAlgorithms/sortingAlgorithms.js';

const   ANIMATION_SPEED_MS = 3;

const NUMBER_OF_ARRAY_BARS = 380;
export default class SortingVisualiser extends React.Component {
    //initialises the comonent's state
    constructor(props) {
        super(props);
        this.state = {
            //intialises the array with an empty array
            array: [],
            isMergeSortRunning: false,
            isQuickSortRunning: false,
        };
    }

    //generates a new array when the page is loaded
    componentDidMount() {
        this.resetArray();
    }
    resetArray() {
        if(this.state.isMergeSortRunning){
            this.stopMergeSort();
        }
        const array = [];
        for (let i=0; i< NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(5, 730));
        }
        //updates the component with this array
        this.setState({array, isMergeSortRunning: false});
        // Set all bars to red after the state has been updated
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = 'pink';
        }
    }
    mergeSort() {
        if (this.state.isMergeSortRunning) {
            return;
        }
        this.setState({ isMergeSortRunning: true });
        const animations = getMergeSortAnimations(this.state.array);
        this.animateMergeSort(animations);
    }
    
    animateMergeSort(animations) {
        const arrayBars = document.getElementsByClassName('array-bar');
        let timeouts = [];
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                timeouts.push(setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS));
            } else {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                timeouts.push(setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`; // Update height according to animation
                }, i * ANIMATION_SPEED_MS));
            }
        }
        this.timeouts = timeouts;
    }
    stopMergeSort(){
        if (this.timeouts) {
            this.timeouts.forEach(timeout => clearTimeout(timeout));
        }
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i=0; i< arrayBars.length; i++){
            arrayBars[i].style.backgroundColor = 'pink';
        }
        this.setState({isMergeSortRunning: false});
        this.setState({isMergeSortRunning: false, isQuickSortRunning: false});
        this.timeouts = null;
    }

    quickSort() {}
    quickSort() {
        this.setState({isQuickSortRunning: true});
        //get the quick sort animations
        const animations = getQuickSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let timeouts = [];
        //loop through the animations and update the array bars accordingly
        for (let i =0; i < animations.lenght; i++) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            timeouts.push(setTimeout(() =>{
                // swap the heights pf the two bars
                const tempHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tempHeight;
                // update the colours of the two bars
                barOneStyle.backgroundColor = 'turquoise';
                barTwoStyle.backgroundColor = 'turquoise';
            }, i * ANIMATION_SPEED_MS));
        }
        timeouts.push(setTimeout(() => {
            this.setState({isQuickSortRunning: false});
        }, animations.length * ANIMATION_SPEED_MS));
        this.timeouts = timeouts;
    }

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