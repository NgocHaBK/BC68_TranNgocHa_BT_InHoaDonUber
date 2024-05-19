#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <math.h>
#include <time.h>

#define NUM_POINTS 10000000
#define NUM_THREADS 14

int total_points_inside_circle = 0;
pthread_mutex_t lock;

void* generate_points(void* arg) {
    int points_inside_circle = 0;
    int points_per_thread = NUM_POINTS / NUM_THREADS;
    
    for (int i = 0; i < points_per_thread; i++) {
        double x = (double)rand() / RAND_MAX * 2 - 1;
        double y = (double)rand() / RAND_MAX * 2 - 1;
        
        if (x * x + y * y <= 1) {
            points_inside_circle++;
        }
    }
    
    pthread_mutex_lock(&lock);
    total_points_inside_circle += points_inside_circle;
    pthread_mutex_unlock(&lock);
    
    return NULL;
}

double estimate_pi() {
    pthread_t threads[NUM_THREADS];
    
    // Initialize mutex
    pthread_mutex_init(&lock, NULL);
    
    // Create threads
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_create(&threads[i], NULL, generate_points, NULL);
    }
    
    // Join threads
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
    
    // Destroy mutex
    pthread_mutex_destroy(&lock);
    
    // Estimate pi
    double pi_estimate = 4.0 * total_points_inside_circle / NUM_POINTS;
    return pi_estimate;
}

int main() {
    srand(time(NULL)); // Seed the random number generator
    
    clock_t start_time, end_time;
    double cpu_time_used;
    
    start_time = clock();
    double estimated_pi = estimate_pi();
    end_time = clock();
    
    cpu_time_used = ((double) (end_time - start_time)) / CLOCKS_PER_SEC;
    
    printf("Estimated value of pi: %f\n", estimated_pi);
    printf("Total CPU time used: %.2f seconds\n", cpu_time_used);
    
    return 0;
}