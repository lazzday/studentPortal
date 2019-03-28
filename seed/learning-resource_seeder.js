var LearningResource = require('../models/learningResource');

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/learning');

var learningResource = [
    new LearningResource({
        fileName: 'testCloud.txt',
        filePath: 'resources/Cloud/',
        title: 'Cloud Computing Test',
        uploader: 'testuser',
        subject: 'cloud',
        date: 'testTime'
    }),
    new LearningResource({
        fileName: 'testSoftware.txt',
        filePath: 'resources/SoftwareEng/',
        title: 'Software Engineering Test',
        uploader: 'testuser',
        subject: 'sweng',
        date: 'testTime'
    }),
    new LearningResource({
        fileName: 'testAndroid.txt',
        filePath: 'resources/MobileAppDev/',
        title: 'Mobile App Development Test',
        uploader: 'testuser',
        subject: 'appdev',
        date: 'testTime'
    }),
    new LearningResource({
        fileName: 'testDSP.txt',
        filePath: 'resources/DSP/',
        title: 'DSP Test',
        uploader: 'testuser',
        subject: 'dsp',
        date: 'testTime'
    }),
    new LearningResource({
        fileName: 'testC++.txt',
        filePath: 'resources/C++/',
        title: 'C++ Test',
        uploader: 'testuser',
        subject: 'c++',
        date: 'testTime'
    }),
    new LearningResource({
        fileName: 'testProfessional.txt',
        filePath: 'resources/ProfessionalEng/',
        title: 'Professional Engineering Test',
        uploader: 'testuser',
        subject: 'proeng',
        date: 'testTime'
    }),
    new LearningResource({
        fileName: 'testProject.txt',
        filePath: 'resources/ProjectEng/',
        title: 'Project Engineering Test',
        uploader: 'testuser',
        subject: 'project',
        date: 'testTime'
    }),
    new LearningResource({
        fileName: 'testMisc.txt',
        filePath: 'resources/Misc/',
        title: 'Miscellaneous Test',
        uploader: 'testuser',
        subject: 'misc',
        date: 'testTime'
    })
]

var done = 0;
for(var i = 0; i < learningResource.length; i++) {
    learningResource[i].save(function(err, result) {
        done++;
        if(done === learningResource.length) {
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}