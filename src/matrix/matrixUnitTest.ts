import{ add, addInPlace, minus, minusInPlace, mul, mulInPlace, mul_gpu, x_mul_xT, xT_mul_x, dotMul, dotMulInPlace, mat} from './matrix';
import {mean, std } from './vector';
var assert = require('assert');

export function matrixTest() {
    matrixAllocationTest();
    matrixClearTest();
    matrixVectorInitializationTest();
    matrixRangeTest();
    matrixCloneAndCopyTest();
    matrixInitTest();
    matrixOperationTest();
}

function vcectorTest() {
    assert.ok(mean([1, 2, 3]) == 2 && std([1,2,3])==1, "vector test shouldn't fail.");
}

function matrixAllocationTest(){
    var tmat = new mat().init([[1, 2], [3, 4]]);
    assert.ok(tmat.val[0][0] == 1 && tmat.val[0][1] == 2 && tmat.val[1][0] == 3 && tmat.val[1][1] == 4 && tmat.rows == 2 && tmat.cols == 2, "matrix allocation test shouldn't fail.");
