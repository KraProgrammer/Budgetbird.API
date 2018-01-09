function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function saveJourney(req, res, next) {
    try {
        // using Bearer header
        const id = req.params.journeyId;
        if (id == "") {
            throw "journey not set";
        }
        
        req.journeyData = {"id": id};

        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Endpoint error occurred'
        });
    }
}

module.exports = {
    escapeHtml: escapeHtml,
    saveJourney: saveJourney
};


