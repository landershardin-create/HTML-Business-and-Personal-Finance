// automation/updatePipeline.js

export function runUnifiedUpdate(reason, entity = null) {
    const entities = loadEntities(); // replace window.entities

    const unified = updateUnifiedFinancialTruth(entities);

    unified_state.add({
        ...unified,
        update_reason: reason
    });

    return unified;
}