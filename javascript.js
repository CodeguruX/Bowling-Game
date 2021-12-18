$(document).ready(function() {
    var t = $('#bowlTable').DataTable({
        "destroy":   true,
        "paging":    false,
        "ordering":  false,
        "info":      false,
        "searching": false
    });
        
    $('#addRow').on( 'click', function () {

        t.clear().draw(); // Ready table for new game by removing all rows

        var roll1 = 0;
        var roll2 = 0;
        var roll3 = 0;
        var frame = 1;
        var score = 0;

        var strike = false;
        var strikeCount = 0;
        var spare = false;

        while (frame < 10)
        {
            roll1 = Math.floor(Math.random() * 11);
            roll2 = Math.floor(Math.random() * (11-roll1));

            if (strike == true) // The previous frame was a strike
            {
                if (roll1 == 10)
                {
                    score += 10 + (strikeCount * 10);

                    if (strikeCount < 2)
                    {
                        strikeCount++
                    }

                    t.row.add( [
                         frame,
                         'Strike!',
                         'X',
                         score
                    ] ).draw( false );

                    frame++;
                    strike = true;
                    spare = false;
                    continue;
                }
                else if ((roll1 + roll2) == 10)
                {
                    score += 10;

                    t.row.add( [
                         frame,
                         roll1,
                         '/',
                         score
                    ] ).draw( false );

                    frame++;
                    spare = true;
                    strike = false;
                    continue;
                }
                else
                {
                    score += (roll1 + roll1 + roll2 + roll2);

                    t.row.add( [
                        frame,
                        roll1,
                        roll2,
                        score
                    ] ).draw( false );

                    strike = false;
                    spare = false;
                    strikeCount = 0;
                    frame++;
                    continue;
                }
            }
            else if (spare == true) // The previous frame was a spare
            {
                if (roll1 == 10)
                {
                    score += 10 + roll1;

                    if (strikeCount < 2)
                    {
                        strikeCount++
                    }

                    t.row.add( [
                         frame,
                         'Strike!',
                         'X',
                         score
                    ] ).draw( false );

                    frame++;
                    strike = true;
                    spare = false;
                    continue;
                }
                else if ((roll1 + roll2) == 10)
                {
                    score += 10 + roll1;

                    t.row.add( [
                         frame,
                         roll1,
                         '/',
                         score
                    ] ).draw( false );
                    spare = true;
                    strike = false;

                    frame++;
                    continue;
                }
                else
                {
                    score += (roll1 + roll1 + roll2);

                    t.row.add( [
                        frame,
                        roll1,
                        roll2,
                        score
                    ] ).draw( false );

                    strike = false;
                    spare = false;
                    strikeCount = 0;
                    frame++;
                    continue;
                }
            }
            else // The previous frame was not a spare or a strike
            {
                if (roll1 == 10)
                {
                    score += (10 + (strikeCount * 10));

                    if (strikeCount < 2)
                    {
                        strikeCount++
                    }

                    t.row.add( [
                         frame,
                         'Strike!',
                         'X',
                         score
                    ] ).draw( false );
                    frame++;
                    strike = true;
                    spare = false;
                    continue;
                }
                else if ((roll1 + roll2) == 10)
                {

                    score += 10;

                    t.row.add( [
                         frame,
                         roll1,
                         '/',
                         score
                    ] ).draw( false );

                    frame++;
                    spare = true;
                    strike = false;
                    continue;
                }
                else
                {
                    score += (roll1 + roll2);

                    t.row.add( [
                        frame,
                        roll1,
                        roll2,
                        score
                    ] ).draw( false );

                    strike = false;
                    spare = false;
                    strikeCount = 0;
                    frame++;
                    continue;
                }

            }

        }

        if (frame == 10) // The check for a 10th frame third roll
        {
            roll1 = Math.floor(Math.random() * 11);
            roll2 = Math.floor(Math.random() * 11);
            roll3 = Math.floor(Math.random() * 11);

            if (strike == true) // Handles frame 9 strike or spare logic
            {
                score += roll1 + roll1 + roll2 + roll2;
            }
            else if (spare = true)
            {
                score += roll1 + roll1 + roll2;
            }
            else
            {
                score += roll1 + roll2;
            }

            if (roll1 == 10) // First roll was a strike
            {
                t.row.add( [
                    frame,
                    roll1,
                    roll2,
                    score
                ] ).draw( false );
                document.getElementById("thirdRollSpan").textContent = roll3.toString();
                score += roll3;
                document.getElementById("finalScoreSpan").textContent = score.toString();
            }
            else if (roll1 + roll2 == 10) // First two rolls were a spare
            {
                t.row.add( [
                    frame,
                    roll1,
                    roll2,
                    score
                ] ).draw( false );
                document.getElementById("thirdRollSpan").textContent = roll3.toString();
                score += roll3;
                document.getElementById("finalScoreSpan").textContent = score.toString();
            }
            else // No strike or spare, thus no third roll score
            {
                t.row.add( [
                    frame,
                    roll1,
                    roll2,
                    score
                ] ).draw( false );
                document.getElementById("thirdRollSpan").textContent = "None";
                document.getElementById("finalScoreSpan").textContent = score.toString();
            }
        }  
    } );
} );