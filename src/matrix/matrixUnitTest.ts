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

function vcecto