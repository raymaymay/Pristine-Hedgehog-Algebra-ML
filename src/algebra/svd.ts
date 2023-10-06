import { mat } from '../matrix/matrix';

//Source code from: https://github.com/stardisblue/svdjs/blob/master/src/index.ts
//Author: stardisblue

class SVDresult {
    q: mat;
    U: mat;
    V: mat;
    constructor(q_: mat, U_: mat, V_: mat) {
        this.q = q_; this.U = U_; this.V = V_;
    }
}

function SVD(A: mat) {
    var ret = SVD_(A.val);
    return new SVDresult(new mat().initVec(ret.q), new mat().init(ret.u), new mat().init(ret.v));
}

export { SVD, SVDresult };


interface SVDResult {
    /**
     * A vector holding the singular values of `A`; they are non-negative but not necessarily ordered in
     *      decreasing sequence
     */
    q: number[];

    /**
     * Represents the matrix U with orthonormalized columns (`if withu is true` otherwise `u` is used as
     *      a working storage)
     */
    u: number[][];

    /**
     * Represents the orthogonal matrix V (`if withv === true`, otherwise `v` is not used)
     */
    v: number[][];
}

interface SVDParameters {
    /** if U is desired */
    u?: boolean;
    /** if V is desired */
    v?: boolean;
    /** constant used in the test for convergence; should not be smaller than the machine precision */
    eps?: number;
}

interface SVDDestructured {
    /** if U is desired */
    u: boolean;
    /** if V is desired */
    v: boolean;
    /** constant used in the test for convergence; should not be smaller than the machine precision */
    eps: number;
}
/** SVD procedure as explained in "Singular Value Decomposition and Least Squares Solutions. By G.H. Golub et al."
 *
 * This procedure computes the singular values and complete orthogonal decomposition of a real rectangular matrix A:
 *
 * `A = U * diag(q) * V(t), U(t) * U = V(t) * V = I`
 *
