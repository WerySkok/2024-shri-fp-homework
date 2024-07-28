import {
    allPass,
    propEq,
    equals,
    all,
    values,
    omit,
    compose,
    count,
    countBy,
    identity,
    gte,
    filter,
    isEmpty,
    not,
    __,
    anyPass,
} from 'ramda';
/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const isWhite = equals('white');
const isRed = equals('red');
const isOrange = equals('orange');
const isGreen = equals('green');
const isBlue = equals('blue');

const isStarRed = propEq('star', 'red');
const isSquareGreen = propEq('square', 'green');
const isCircleBlue = propEq('circle', 'blue');
const isSquareOrange = propEq('square', 'orange');
const isTriangleGreen = propEq('triangle', 'green');
const isStarWhite = propEq('star', 'white');
const isTriangleWhite = propEq('triangle', 'green');

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (figures) => {
    const restIsWhite = compose(all(isWhite), values, omit(['star', 'square']));

    return allPass([isStarRed, isSquareGreen, restIsWhite])(figures);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(gte(__, 2), count(isGreen), values);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    const redFigures = compose(count(isRed), values)(figures);
    const blueFigures = compose(count(isBlue), values)(figures);
    return equals(redFigures, blueFigures);
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    isCircleBlue,
    isStarRed,
    isSquareOrange,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
    const countColors = countBy(identity);
    return compose(
        not,
        isEmpty,
        filter(gte(__, 3)),
        omit(['white']),
        countColors,
        values
    )(figures);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (figures) => {
    const greenFiguresEq2 = compose(equals(2), count(isGreen), values);
    const redFiguresEq1 = compose(equals(1), count(isRed), values);
    return allPass([greenFiguresEq2, isTriangleGreen, redFiguresEq1])(figures);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(all(isOrange), values);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = compose(not, anyPass([isStarRed, isStarWhite]));

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(all(isGreen), values);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    ({ triangle, square }) => equals(triangle, square),
    compose(not, isTriangleWhite),
]);
