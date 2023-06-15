/* La constante "option" regresa el resultado 
de true o false, es decir validado o no validado */
const optionValidation = (validate) => {
const trueArray = [
    {href:},
    {text:},
    {file:},
    {status:},
    {ok:},    
];
const falseArray = [
    {href:},
    {text:},
    {file:},
]
    if(validate === true) {
        return trueArray
}else{
    return falseArray 
} 
};
module.exports = option;