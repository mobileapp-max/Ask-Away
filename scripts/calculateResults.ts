export const calculateResults = ({ answer_1, answer_2 }: { answer_1: number, answer_2: number }) => {
    if (answer_1 === 0 && answer_2 === 0) {
        const resultObj = {
            answer_1_result: 0,
            answer_2_result: 0,
        }
        const bothZeros = true
        return {
            resultObj,
            bothZeros
        }
    }
    else {
        const answer_1_result = 100 * answer_1 / (answer_1 + answer_2)
        const answer_2_result = 100 * answer_2 / (answer_1 + answer_2)
        return {
            answer_1_result,
            answer_2_result
        }
    }

}