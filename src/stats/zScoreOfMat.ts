
﻿import { mat, mean, std, zScore } from '../app';

/*

Standardized z scores
input X: the matrix
isUsingSampleStandardDeviation == true: using Sample Standard Deviation, otherwise using population standard deviation.
isColumn== true: z-score of column
return: the z-score of X, in which each element of every column has mean of 0 and standard deviation 1

*/



function zScoreOfMatrix(x: mat, isUsingSampleStandardDeviation = true, isColumn = true): mat {

    if (isUsingSampleStandardDeviation) return zScoreUsingSampleStandardDeviation(x, isColumn);
    else {
        throw new Error("population standard deviation is not implemented yet.");
    }
}

function zScoreUsingSampleStandardDeviation(x_: mat, isColumn = true): mat {
    var xT = new mat();
    if (isColumn) {
        xT = x_.T();
    }