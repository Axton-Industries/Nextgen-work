/**
 * Mock data structured as if it were retrieved from a PostgreSQL database.
 * Uses snake_case for keys and includes unique identifiers.
 */

export const writing_overview_rows = [
    { student_id: 1, full_name: 'Julia', word_count: 180, last_submission: '2025-12-28' },
    { student_id: 2, full_name: 'Evelin', word_count: 195, last_submission: '2025-12-27' },
    { student_id: 3, full_name: 'Matis', word_count: 205, last_submission: '2025-12-26' },
    { student_id: 4, full_name: 'Sofia', word_count: 215, last_submission: '2025-12-25' },
    { student_id: 5, full_name: 'Hugo', word_count: 225, last_submission: '2025-12-24' },
    { student_id: 6, full_name: 'Samuel', word_count: 245, last_submission: '2025-12-23' },
    { student_id: 7, full_name: 'Clara', word_count: 250, last_submission: '2025-12-22' },
    { student_id: 8, full_name: 'Irene', word_count: 252, last_submission: '2025-12-21' },
    { student_id: 9, full_name: 'Andrés', word_count: 255, last_submission: '2025-12-20' },
    { student_id: 10, full_name: 'Diego', word_count: 265, last_submission: '2025-12-19' },
    { student_id: 11, full_name: 'Valeria', word_count: 268, last_submission: '2025-12-18' },
    { student_id: 12, full_name: 'Matías', word_count: 270, last_submission: '2025-12-17' },
    { student_id: 13, full_name: 'Daniel', word_count: 285, last_submission: '2025-12-16' },
    { student_id: 14, full_name: 'Carla', word_count: 300, last_submission: '2025-12-15' },
    { student_id: 15, full_name: 'Lucas', word_count: 310, last_submission: '2025-12-14' },
    { student_id: 16, full_name: 'Martin', word_count: 325, last_submission: '2025-12-13' },
    { student_id: 17, full_name: 'Freya', word_count: 340, last_submission: '2025-12-12' },
    { student_id: 18, full_name: 'Max', word_count: 355, last_submission: '2025-12-11' },
    { student_id: 19, full_name: 'Matis_S', word_count: 370, last_submission: '2025-12-10' },
].sort((a, b) => b.word_count - a.word_count);

export const engagement_metrics = [
    { id: 1, submission_count: 3, time_spent_min: 40 },
    { id: 2, submission_count: 8, time_spent_min: 90 },
    { id: 3, submission_count: 10, time_spent_min: 20 },
    { id: 4, submission_count: 12, time_spent_min: 95 },
    { id: 5, submission_count: 14, time_spent_min: 150 },
    { id: 6, submission_count: 18, time_spent_min: 180 },
    { id: 7, submission_count: 21, time_spent_min: 125 },
    { id: 8, submission_count: 21, time_spent_min: 155 },
    { id: 9, submission_count: 25, time_spent_min: 15 },
    { id: 10, submission_count: 26, time_spent_min: 190 }
];

export const improvement_stats = [
    { id: 101, resubmission_avg: 2, score_avg: 20 },
    { id: 102, resubmission_avg: 2, score_avg: 25 },
    { id: 103, resubmission_avg: 2, score_avg: 100 },
    { id: 104, resubmission_avg: 3, score_avg: 40 },
    { id: 105, resubmission_avg: 5, score_avg: 45 },
    { id: 106, resubmission_avg: 5, score_avg: 100 },
    { id: 107, resubmission_avg: 8, score_avg: 78 },
    { id: 108, resubmission_avg: 8, score_avg: 88 },
    { id: 109, resubmission_avg: 12, score_avg: 92 },
    { id: 110, resubmission_avg: 14, score_avg: 100 }
];

export const error_analysis_treemap = [
    { word_id: 1001, word: 'Pingüino', occurrence_count: 400 },
    { word_id: 1002, word: 'Frigorífico', occurrence_count: 300 },
    { word_id: 1003, word: 'Película', occurrence_count: 150 },
    { word_id: 1004, word: 'Coliflor', occurrence_count: 100 },
];


export const top_error_questions = [
    { id: 201, question: "How old was Lucía?", errors: 54 },
    { id: 202, question: "What happened in 1492?", errors: 48 },
    { id: 203, question: "What's the capital of Spain?", errors: 30 },
    { id: 204, question: "What's the nickname of...", errors: 25 },
    { id: 205, question: "Who's Lucia's uncle?", errors: 38 }
];

export const summary_stats = [
    { title: "Total Students", value: "20", subtext: "18 Active" },
    { title: "App Time", value: "30min", subtext: "+5%" },
    { title: "Avg Score", value: "80%", subtext: "+10%" },
    { title: "Completion", value: "75%", subtext: "-8%" }
];
