const { getLanguageById, submitBatch } = require("../utility/problemUtility");

const createProblem = async (req , res) => {
    const {
        title ,
        description,
        difficulty,
        tags,
        visibleTestCases,
        hiddenTestCases,
        startCode,
        referenceSolution,
        problemCreator
    } = req.body;

    try{
        for(let {language , completeCode} of referenceSolution) {
            
            // formate of batch submission
            // source_code:
            // language_id: 
            // stdin: 
            // expected_output:

            const languageId = getLanguageById(language);

            const submissions = visibleTestCases.map((testCases) => ({
                source_code : completeCode,
                language_id : languageId,
                stdin : testCases.input,
                expected_output : testCases.output
            }))

            const submitResult = await submitBatch(submissions);
        }
    }
    catch(err){

    }
}