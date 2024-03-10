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
}

function matrixClearTest() {
    var tmat = new mat().init([[1, 2], [3, 4]]);
    tmat.clear();
    assert(tmat.val.length == 0 && tmat.rows == 0 && tmat.cols == 0, "matrix free test shouldn't fail.");
}

function matrixVectorInitializationTest() {
    var tmat = new mat().initVec([1, 2, 3]);
    assert.ok(tmat.val.length == 1 && tmat.val[0].length==3 && tmat.rows == 1 && tmat.cols == 3, "vector unit tet shouldn't fail.");
}

function matrixRangeTest() {
    var mat1 = new mat().range(1, 10, 2);
    assert.ok(mat1.val[0][0] == 1 && mat1.val[0][4] == 9 && mat1.rows == 1 && mat1.cols == 5, "matrix range test 1 shouldn't fail.");
    var mat2 = new mat().range(5, 1, -2);
    assert.ok(mat2.val[0][0] == 5 && mat2.val[0][1] == 3 && m