

const board = document.querySelector('[data-board]')
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessage = document.querySelector('[data-winning-message]')
const winningMessageTexElements = document.querySelector('[data-winning-message-text]')
const winningMessageButton = document.querySelector('[data-winning-message-button]')
let isCircleTurn

const handleClic = (e) => {
    const cell = e.target
    const classToAdd = isCircleTurn ? 'circle' : 'x'

    placeMark(cell, classToAdd)

    const isWin = checkForWin(classToAdd)
    const isDraw = checkForDraw()
    if (isWin) {
        endGame(false)
    } else if (isDraw) {
        endGame(true)
    } else {
        swapTurns()
    }
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass()
}

const setBoardHoverClass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')
    if (isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }
}

const startGame = () => {
    isCircleTurn = false

    for (const cell of cellElements) {
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClic)
        cell.addEventListener('click', handleClic, { once: true })
    }

    setBoardHoverClass()
    winningMessage.classList.remove('show-winning-message')

}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTexElements.innerHTML = 'Empate!'
    } else {
        winningMessageTexElements.innerHTML = isCircleTurn ? 'O Venceu!' : 'X Venceu!'
    }
    winningMessage.classList.add('show-winning-message')
}

startGame()

winningMessageButton.addEventListener('click', startGame)

