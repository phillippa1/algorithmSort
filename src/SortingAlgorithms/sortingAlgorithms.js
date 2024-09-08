export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length -1, auxiliaryArray, animations);
    return animations;
}

export function mergeSort(array) {
    if (array.length <= 1) return array;
    mergeSortHelper(array, 0, array.length - 1, array, []);
    return array;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx; 
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i,j]);
        animations.push([i,j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]){
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }else{
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
        
    }
    while (i <= middleIdx) {
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }

}


//quickSort

export function getQuickSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, low, high, animations){
    if(low < high){
        const pivotIndex = partition(array , low, high, animations);
        quickSortHelper(array, low, pivotIndex - 1, animations);
        quickSortHelper(array, pivotIndex +1, high, animations);
    }
}

function partition (array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j=low; j < high; j++){
        if(array[j] < pivot) {
            i++;
            //swap array[i] and array[j]
            animations.push([i, j]);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    //swap array[i + 1] and array[high]
    animations.push([i + 1, high]);
    [array[i+1], array[high]] = [array[high], array[i+1]];
    return i + 1;
}

