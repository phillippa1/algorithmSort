// export const mergeSort =(array, animations = []) => {
//     if (array.length <= 1) return array;
//     const middleIdx = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0, middleIdx));
//     const secondHalf = mergeSort(array.slice(middleIdx));
//     const sortedArray = [];
//     let i = 0, 
//         j = 0;
//     while (i< firstHalf.length && j < secondHalf.length){
//         if (firstHalf[i] < secondHalf[j]) {
//             sortedArray.push(firstHalf[i++]);
//         }else{
//             sortedArray.push(secondHalf[j++]);
//         }
//     }
//     while (i< firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while (j< secondHalf.length) sortedArray.push(secondHalf[j++]);
//     return sortedArray;
// };

// export default mergeSort;


export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length -1, auxiliaryArray, animations);
    return animations;
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
    mergeSortHelper(mainArray, startIdx, middleIdx, auxiliaryArray, animations);
    mergeSortHelper(mainArray, middleIdx + 1, endIdx, auxiliaryArray, animations);
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
    let k = startIdx, i = startIdx, j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        const animation = {};
        animation.comparison = [i, j];
        if (auxiliaryArray[i] <= auxiliaryArray[j]){
            animation.swap = [k,i];
            mainArray[k++] = auxiliaryArray[i++];
        }else{
            animation.swap = [k,j];
            mainArray[k++] = auxiliaryArray[j++];
        }
        animations.push(animation);
    }
    while (i <= middleIdx) {
        animations.push({
            comparison: [i, i],
        });
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx){
        animations.push({
            comparison: [j, j],
            swap: [k,j],
        });
        mainArray[k++] = auxiliaryArray[j++];
    }
}
export default mergeSort;
