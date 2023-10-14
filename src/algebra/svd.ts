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
 * where the arrays `a`, `u`, `v`, `q` represent `A`, `U`, `V`, `q` respectively. The actual parameters corresponding to `a`, `u`, `v` may
 * all be identical unless `withu = withv = true`. In this case, the actual parameters corresponding to `u` and `v` must
 * differ. `m >= n` is assumed (with `m = a.length` and `n = a[0].length`)
 *
 *  @param a  Represents the matrix A to be decomposed
 *  @param options SVD options
 *
 * @returns {SVDResult} the result of the svd
 */
function SVD_(a: number[][], options?: SVDParameters): SVDResult {
    let { u: withu, v: withv, eps }: SVDDestructured = {
        u: true,
        v: true,
        eps: Math.pow(2, -52),
        ...options
    };
    const tol = 1e-64 / eps;

    // throw error if a is not defined
    if (!a) {
        throw new TypeError("Matrix a is not defined");
    }

    // Householder's reduction to bidiagonal form

    const n = a[0].length;
    const m = a.length;

    if (m < n) {
        throw new TypeError("Invalid matrix: m < n");
    }

    let l1, c, f, h, s, y, z;

    let l = 0,
        g = 0,
        x = 0;
    const e = [];

    const u: number[][] = [];
    const v: number[][] = [];

    // Initialize u
    for (let i = 0; i < m; i++) {
        u[i] = new Array(n).fill(0);
    }

    // Initialize v
    for (let i = 0; i < n; i++) {
        v[i] = new Array(n).fill(0);
    }

    // Initialize q
    const q: number[] = new Array(n).fill(0);

    // Copy array a in u
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            u[i][j] = a[i][j];
        }
    }

    for (let i = 0; i < n; i++) {
        e[i] = g;
        s = 0;
        l = i + 1;
        for (let j = i; j < m; j++) {
            s += Math.pow(u[j][i], 2);
        }
        if (s < tol) {
            g = 0;
        } else {
            f = u[i][i];
            g = f < 0 ? Math.sqrt(s) : -Math.sqrt(s);
            h = f * g - s;
            u[i][i] = f - g;
            for (let j = l; j < n; j++) {
                s = 0;
                for (let k = i; k < m; k++) {
                    s += u[k][i] * u[k][j];
                }
                f = s / h