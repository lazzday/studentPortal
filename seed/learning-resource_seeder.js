var LearningResource = require('../models/learningResource');

var mongoose = require('mongoose')

for (var i = 1; i < 5; i++) {

    mongoose.connect('mongodb://localhost:27017/learning');

    var learningResource = [
        new LearningResource({
            fileName: 'testCloud' + i + '.txt',
            filePath: 'resources/Cloud/',
            title: 'Cloud Computing Test' + i,
            uploader: 'testuser',
            subject: 'cloud',
            date: 'testTime'
        }),
        new LearningResource({
            fileName: 'testSoftware' + i + '.txt',
            filePath: 'resources/SoftwareEng/',
            title: 'Software Engineering Test' + i,
            uploader: 'testuser',
            subject: 'sweng',
            date: 'testTime'
        }),
        new LearningResource({
            fileName: 'testAndroid' + i + '.txt',
            filePath: 'resources/MobileAppDev/',
            title: 'Mobile App Development Test' + i,
            uploader: 'testuser',
            subject: 'appdev',
            date: 'testTime'
        }),
        new LearningResource({
            fileName: 'testDSP' + i + '.txt',
            filePath: 'resources/DSP/',
            title: 'DSP Test' + i,
            uploader: 'testuser',
            subject: 'dsp',
            date: 'testTime'
        }),
        new LearningResource({
            fileName: 'testC++' + i + '.txt',
            filePath: 'resources/C++/',
            title: 'C++ Test' + i,
            uploader: 'testuser',
            subject: 'c++',
            date: 'testTime'
        }),
        new LearningResource({
            fileName: 'testProfessional' + i + '.txt',
            filePath: 'resources/ProfessionalEng/',
            title: 'Professional Engineering Test' + i,
            uploader: 'testuser',
            subject: 'proeng',
            date: 'testTime'
        }),
        new LearningResource({
            fileName: 'testProject' + i + '.txt',
            filePath: 'resources/ProjectEng/',
            title: 'Project Engineering Test' + i,
            uploader: 'testuser',
            subject: 'project',
            date: 'testTime'
        }),
        new LearningResource({
            fileName: 'testMisc' + i + '.txt',
            filePath: 'resources/Misc/',
            title: 'Miscellaneous Test' + i,
            uploader: 'testuser',
            subject: 'misc',
            date: 'testTime'
        })
    ]

    var done = 0;
    for (var i = 0; i < learningResource.length; i++) {
        learningResource[i].save(function (err, result) {
            done++;
            if (done === learningResource.length) {
                exit();
            }
        });
    }
}

function exit() {
    mongoose.disconnect();
}