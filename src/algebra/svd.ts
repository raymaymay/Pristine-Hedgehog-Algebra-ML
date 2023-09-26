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
     * A vector holding the singular values of `A`; they are non-negative but not necessari