import numpy as np
import pandas as pd

# -----------------------------
# STEP 1: CREATE DATASET
# -----------------------------
data = {
    'hours': [1, 2, 3, 4, 5],
    'marks': [2, 4, 5, 4, 5]
}

df = pd.DataFrame(data)

# Input (X) and Output (y)
X = df['hours'].values
y = df['marks'].values

# -----------------------------
# STEP 2: INITIALIZE PARAMETERS
# -----------------------------
m = 0   # slope
b = 0   # intercept

learning_rate = 0.01
epochs = 1000

n = len(X)

# -----------------------------
# STEP 3: TRAIN MODEL
# -----------------------------
for i in range(epochs):
    y_pred = m * X + b

    # Gradients
    dm = (-2/n) * np.sum(X * (y - y_pred))
    db = (-2/n) * np.sum(y - y_pred)

    # Update weights
    m = m - learning_rate * dm
    b = b - learning_rate * db

# -----------------------------
# STEP 4: OUTPUT MODEL
# -----------------------------
print("Trained Model:")
print("Slope (m):", m)
print("Intercept (b):", b)

# -----------------------------
# STEP 5: MAKE PREDICTION
# -----------------------------
new_hours = 6
predicted_marks = m * new_hours + b

print("\nPrediction:")
print(f"If a student studies {new_hours} hours, predicted marks = {predicted_marks:.2f}")

# -----------------------------
# STEP 6: TEST ON TRAINING DATA
# -----------------------------
print("\nActual vs Predicted:")
for i in range(len(X)):
    pred = m * X[i] + b
    print(f"Hours: {X[i]}, Actual: {y[i]}, Predicted: {round(pred,2)}")