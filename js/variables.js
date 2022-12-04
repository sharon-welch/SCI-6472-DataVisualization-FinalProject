let xText = '';
let yText = '';
let yTextSymbol = '';


function getText(selectedCategoryScatterX,selectedCategoryScatterY) {
    if (selectedCategoryScatterX === "RidingHistory") {
        xText = "Length of Time Biking"
    } else if (selectedCategoryScatterX === "RidingFrequency") {
        xText = "Biking Frequency"
    } else if (selectedCategoryScatterX === "LongestDist") {
        xText = "Longest Distance Traveled"
    } else if (selectedCategoryScatterX === "AverageDist") {
        xText = "Average Distance Traveled"
    } else if (selectedCategoryScatterX === "Speed") {
        xText = "Average Speed"
    } else if (selectedCategoryScatterX === "Standing") {
        xText = "% Time Standing During a Ride"
    } else if (selectedCategoryScatterX === "PaddedShorts") {
        xText = "How Often Padded Shorts Are Worn"
    } else if (selectedCategoryScatterX === "SaddleType") {
        xText = "Type of Saddle"
    } else if (selectedCategoryScatterX === "SaddleAngle") {
        xText = "Angle of Saddle"
    } else if (selectedCategoryScatterX === "BikeType") {
        xText = "Type of Bike"
    } else if (selectedCategoryScatterX === "HandleBars") {
        xText = "Height of Handlebars (Compared to Saddle)"
    } else if (selectedCategoryScatterX === "Surface") {
        xText = "Typical Surface for Biking"
    }


    if (selectedCategoryScatterY === "LUTS") {
        yText = "Urinary Wellness"
    } else if (selectedCategoryScatterY === "NumbScore") {
        yText = "Degree of Genital Numbness"
    } else if (selectedCategoryScatterY === "NumbTime") {
        yText = "Length of Feeling of Numbness"
    } else if (selectedCategoryScatterY === "UTI") {
        yText = "History of UTI"
    } else if (selectedCategoryScatterY === "UTINum") {
        yText = "Number of Prior UTIs"
    } else if (selectedCategoryScatterY === "Nodules") {
        yText = "History of Genital + Perineal Nodules"
    } else if (selectedCategoryScatterY === "SaddleSores") {
        yText = "History of Saddle Sores"
    } else if (selectedCategoryScatterY === "IPSS") {
        yText = "Prostate Symptoms"
    } else if (selectedCategoryScatterY === "UrinaryFilling") {
        yText = "Urinary Filling Dysfunction"
    } else if (selectedCategoryScatterY === "UrinaryVoiding") {
        yText = "Urinary Voiding Dysfunction"
    }
return xText, yText;
}


function getTextSymbol(selectedCategoryScatterX,selectedCategoryScatterY) {
    if (selectedCategorySymbolY === "LUTS") {
        yTextSymbol = "Urinary Wellness"
    } else if (selectedCategorySymbolY === "NumbScore") {
        yTextSymbol = "Degree of Genital Numbness"
    } else if (selectedCategorySymbolY === "NumbTime") {
        yTextSymbol = "Length of Feeling of Numbness"
    } else if (selectedCategorySymbolY === "UTI") {
        yTextSymbol = "History of UTI"
    } else if (selectedCategorySymbolY === "UTINum") {
        yTextSymbol = "Number of Prior UTIs"
    } else if (selectedCategorySymbolY === "Nodules") {
        yTextSymbol = "History of Genital + Perineal Nodules"
    } else if (selectedCategorySymbolY === "SaddleSores") {
        yTextSymbol = "History of Saddle Sores"
    } else if (selectedCategorySymbolY === "IPSS") {
        yTextSymbol = "Prostate Symptoms"
    } else if (selectedCategorySymbolY === "UrinaryFilling") {
        yTextSymbol = "Urinary Filling Dysfunction"
    } else if (selectedCategorySymbolY === "UrinaryVoiding") {
        yTextSymbol = "Urinary Voiding Dysfunction"
    }
    return yTextSymbol;
}