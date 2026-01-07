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

export const students = [
    { id: 1, full_name: 'Julia', active: true },
    { id: 2, full_name: 'Evelin', active: true },
    { id: 3, full_name: 'Matis', active: true },
    { id: 4, full_name: 'Sofia', active: true },
    { id: 5, full_name: 'Hugo', active: true },
    { id: 6, full_name: 'Samuel', active: true },
    { id: 7, full_name: 'Clara', active: true },
    { id: 8, full_name: 'Irene', active: true },
    { id: 9, full_name: 'Andrés', active: true },
    { id: 10, full_name: 'Diego', active: true },
    { id: 11, full_name: 'Valeria', active: true },
    { id: 12, full_name: 'Matías', active: true },
    { id: 13, full_name: 'Daniel', active: true },
    { id: 14, full_name: 'Carla', active: true },
    { id: 15, full_name: 'Lucas', active: true },
    { id: 16, full_name: 'Martin', active: true },
    { id: 17, full_name: 'Freya', active: true },
    { id: 18, full_name: 'Max', active: false },
    { id: 19, full_name: 'Matis_S', active: false },
    { id: 20, full_name: 'Erik', active: true },
];

export const engagement_metrics = [
    { id: 1, full_name: 'Julia', submission_count: 3, time_spent_min: 40 },
    { id: 2, full_name: 'Evelin', submission_count: 8, time_spent_min: 90 },
    { id: 3, full_name: 'Matis', submission_count: 10, time_spent_min: 20 },
    { id: 4, full_name: 'Sofia', submission_count: 12, time_spent_min: 95 },
    { id: 5, full_name: 'Hugo', submission_count: 14, time_spent_min: 150 },
    { id: 6, full_name: 'Samuel', submission_count: 18, time_spent_min: 180 },
    { id: 7, full_name: 'Clara', submission_count: 21, time_spent_min: 125 },
    { id: 8, full_name: 'Irene', submission_count: 21, time_spent_min: 155 },
    { id: 9, full_name: 'Andrés', submission_count: 25, time_spent_min: 15 },
    { id: 10, full_name: 'Diego', submission_count: 26, time_spent_min: 190 }
];

export const improvement_stats = [
    { id: 101, full_name: 'Valeria', resubmission_avg: 2, score_avg: 20 },
    { id: 102, full_name: 'Matías', resubmission_avg: 2, score_avg: 25 },
    { id: 103, full_name: 'Daniel', resubmission_avg: 2, score_avg: 100 },
    { id: 104, full_name: 'Carla', resubmission_avg: 3, score_avg: 40 },
    { id: 105, full_name: 'Lucas', resubmission_avg: 5, score_avg: 45 },
    { id: 106, full_name: 'Martin', resubmission_avg: 5, score_avg: 100 },
    { id: 107, full_name: 'Freya', resubmission_avg: 8, score_avg: 78 },
    { id: 108, full_name: 'Max', resubmission_avg: 8, score_avg: 88 },
    { id: 109, full_name: 'Matis_S', resubmission_avg: 12, score_avg: 92 },
    { id: 110, full_name: 'Julia', resubmission_avg: 14, score_avg: 100 }
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

// Student Specific Data (Erik)
export const erik_stats = [
    { title: "Student Name", value: "Erik", subtext: "" },
    { title: "Time spent on the app", value: "20min", subtext: "+5% from last week" },
    { title: "Avg score in the assignments", value: "70%", subtext: "+10% from last week" },
    { title: "Avg completion per assignment", value: "75%", subtext: "-8% from last week" }
];

export const erik_time_per_assignment = [
    { name: 'Dictation: Médico...', erik: 45, class: 38 },
    { name: 'Writing: Vacaciones...', erik: 40, class: 35 },
    { name: 'Fill: Meses...', erik: 38, class: 30 },
    { name: 'Read&Listen: Fiesta...', erik: 35, class: 32 },
    { name: 'Video: Compras...', erik: 32, class: 28 },
    { name: 'Vocabulary: Animales...', erik: 30, class: 25 },
    { name: 'IA Chat: Estación...', erik: 28, class: 35 },
    { name: 'Vocabulary: Ropa...', erik: 25, class: 22 },
    { name: 'Video: Preparar la cena...', erik: 22, class: 30 },
    { name: 'IA Chat: Mercado...', erik: 20, class: 28 },
];

export const erik_week_activity = [
    { week: 21, erik: 5, avg: 18 },
    { week: 22, erik: 8, avg: 25 },
    { week: 23, erik: 12, avg: 23 },
    { week: 24, erik: 15, avg: 25 },
    { week: 25, erik: 18, avg: 15 },
    { week: 26, erik: 22, avg: 18 },
    { week: 27, erik: 25, avg: 20 },
];

export const erik_performance_trend = [
    { week: 20, erik: 75, class: 45 },
    { week: 21, erik: 65, class: 38 },
    { week: 22, erik: 78, class: 40 },
    { week: 23, erik: 78, class: 52 },
    { week: 24, erik: 82, class: 48 },
    { week: 25, erik: 40, class: 60 },
    { week: 26, erik: 55, class: 48 },
    { week: 27, erik: 72, class: 75 },
    { week: 28, erik: 91, class: 64 },
    { week: 29, erik: 91, class: 78 },
    { week: 30, erik: 75, class: 73 },
];

export const erik_skills = [
    { subject: 'Writing', erik: 10, avg: 7 },
    { subject: 'Expression', erik: 8, avg: 5 },
    { subject: 'Listening', erik: 6, avg: 8 },
    { subject: 'Reading', erik: 9, avg: 6 },
    { subject: 'Vocabulary', erik: 7, avg: 4 },
];
