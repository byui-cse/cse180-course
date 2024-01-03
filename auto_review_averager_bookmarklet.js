var xOfX = document.getElementById('x_of_x_graded').innerText.split('/');
var graded = parseInt(xOfX[0]);
var totalToGrade = parseInt(xOfX[1]);
var times = 0;
while (graded < totalToGrade && times < totalToGrade)
{
    times += 1;
    var studentSelection = document.getElementById('students_selectmenu');
    var notGraded = studentSelection[studentSelection.selectedIndex].innerText.includes('not graded');
    if (notGraded)
    {
        var ruberics = document.getElementById('rubric_assessments_select');
        var sum = 0;
        var average = 0;
        var override = false;
        var overrideValue = 0;
        for (var i = 0; i < ruberics.length; ++i)
        {
            ruberics.selectedIndex = i;
            ruberics.dispatchEvent(new Event('change'));
            rubericTotal = document.querySelectorAll('[data-selenium="rubric_total"]');
            var value = parseFloat(rubericTotal[rubericTotal.length - 1].innerText.substring(14));
            if (ruberics[i].innerText === ENV.current_user.display_name) {
                override = true;
                overrideValue = value;
            }
            sum += value;
        }
        if (ruberics.length > 0)
        {
            average = sum / ruberics.length;
        }
        if (override)
        {
            average = overrideValue;
        }
        if (average > 0 || document.getElementById('multiple_submissions').innerText.includes('MISSING'))
        {
            document.getElementById('grading-box-extended').value = average;
            document.getElementById('grading-box-extended').dispatchEvent(new Event('change'));
        }
        else
        {
            break;
        }
    }
    else if (document.getElementById('multiple_submissions').textContent.search("no submission time") > 0 && document.getElementById('grading-box-extended').value.length == 0) {
        document.getElementById('grading-box-extended').value = 0;
        document.getElementById('grading-box-extended').dispatchEvent(new Event('change'));
    }

    document.getElementById('next-student-button').dispatchEvent(new Event('click'));
    xOfX = document.getElementById('x_of_x_graded').innerText.split('/');
    graded = parseInt(xOfX[0]);
}
