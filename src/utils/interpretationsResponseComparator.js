const filterStopWordsEntitiesFromInterpretations = interpretations => interpretations.map(interpretation => {
    interpretation.slots = interpretation.slots.filter(slot => slot.entityType !== "StopWord");
    return interpretation;
}).filter(interpretation => {
    return interpretation.slots.length !== 0;
})

const getInterpretationDifferences = (interpretation_A, interpretation_B, index) => {
    let interpretationConfidenceDifference = "";
    let slotsDifferences = "";
    
    if(interpretation_A.interpretationConfidence.bin !== interpretation_B.interpretationConfidence.bin) {
        interpretationConfidenceDifference = `Difference in interpretation confidence at the ${index}th interpretation index`;
    }

    interpretation_A.slots.forEach((slot_A, i) => {
        const slot_B = interpretation_B.slots[i];
        if (!slot_B || hasSlotDifferences(slot_A, slot_B)) slotsDifferences += (`Slot difference at position ${i} for the ${index}th interpretation.`)
    })

    return {
        scoreDifference: interpretationConfidenceDifference ? `interpretationConfidenceDifferent=${interpretationConfidenceDifference}` : "",
        slotsDifference: slotsDifferences ? `slotsDifferences=${slotsDifferences}` : ""
    }
}

const hasSlotDifferences = (slot_A, slot_B) => {
    let hasDifference = false;
    if(slot_A.entityType !== slot_B.entityType ||
        // slot_A.value[0].tokens.toString() !== slot_B.value[0].tokens.toString() ||
        slot_A.value[0].resolvedEntities[0].resolvedValue !== slot_B.value[0].resolvedEntities[0].resolvedValue 
    ) hasDifference = true;

    return hasDifference;
}

const interpretationsResponseComparator = {
    getQUSResponsesDiffString: (T1_interpretations, C_interpretationsWithStopWords) => {
        let query_understanding_diff = "";
        let score_diff = "";
        let query_action_diff = "";
        const C_interpretations = filterStopWordsEntitiesFromInterpretations(C_interpretationsWithStopWords);

        if(C_interpretations.length !== T1_interpretations.length) {
            query_understanding_diff = `Different interpretation size. T1 size: ${T1_interpretations.length}, C size (ignoring stopword entities): ${C_interpretations.length}`;
            score_diff = `N/A`;
            const line = [query_understanding_diff, score_diff, query_action_diff].join(',');
            return line;
        }

        T1_interpretations.forEach((T1_interpretation, i) => {
            const C_interpretation = C_interpretations[i];
            const {scoreDifference, slotsDifference} = getInterpretationDifferences(T1_interpretation, C_interpretation, i);
            score_diff += scoreDifference;
            query_understanding_diff += slotsDifference;
        })

        const line = [query_understanding_diff, score_diff].join(',');
        console.log('line is: ', line)
        return line;
    }
}

module.exports = interpretationsResponseComparator;