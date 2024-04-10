import { mat, mul } from '../matrix/matrix';
import { inverse } from '../algebra/inverse';


//reference: https://zhuanlan.zhihu.com/p/25434586
//api design: https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html
//https://www.mathworks.com/matlabcentral/fileexchange/64930-linear-regression-simplest-implementation

class LinearRegression {

    w: mat;

    constructor() { }

    //x: M-by-N matrix. M data with N dimensions. Each row is an N-dim vector
    //y: M-by-1 matrix
    fit(x_: mat, y_: mat) : LinearRegression{

        var y = y_;
        //check the dimension of y
        if (y_.rows != 1 && y_.cols == 1) {
            y = y_.T();
        }


        //expan x_ with one more column with 1
        var x = x_.resize(x_.rows, x_.cols + 1, 1);

        //calculate w = (X.T() * X)^-1 * X.T() * y

        //(X.T() * X)
        var xT_mul_x =