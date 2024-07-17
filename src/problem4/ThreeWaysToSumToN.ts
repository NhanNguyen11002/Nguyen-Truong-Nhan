function sum_to_n_a(n: number): number {
    return n*(n+1)/2
}
console.log('a',sum_to_n_a(5))
function sum_to_n_b(n: number): number {
    let result = 0;
    for (let i = 1;i<=n;i++){
        result += i
    }
    return result
    
}
console.log('b',sum_to_n_b(5))
function sum_to_n_c(n: number): number {
    if(n === 1) return 1 
    else return n + sum_to_n_c(n-1)
}
console.log('c',sum_to_n_c(5))