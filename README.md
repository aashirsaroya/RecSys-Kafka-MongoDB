# **RecSys-Kafka-MongoDB**

This project implements a content-based recommendation engine using **NodeJS**, **Apache Kafka** for event streaming, and **MongoDB Cloud** for data storage. It tracks user activity such as course views and purchases, and provides personalized recommendations based on that data.

## **Features**
- **Event Streaming**: Apache Kafka is used to capture real-time user actions (e.g., views, purchases).
- **Content-Based Recommendations**: Generates personalized recommendations by analyzing user interactions with content.
- **MongoDB Storage**: User actions are stored in MongoDB for easy retrieval and analysis.
- **User Authentication**: Tracks both registered and unregistered user activities using cookies for session management.

## **Tech Stack**
- **NodeJS**: For backend logic and API creation.
- **Apache Kafka**: Event streaming platform to track and process user activities.
- **MongoDB Cloud**: Database for storing user activity data like purchases and viewed courses.

## **Installation**

To run this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/aashirsaroya/RecSys-Kafka-MongoDB
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up **MongoDB**:
    - Use MongoDB Cloud or a local MongoDB instance.
    - Update the connection string in `mongoose.connect()` in the code with your MongoDB URI.
4. Set up **Kafka**:
    - Install Kafka and start a Kafka broker locally.
    - Ensure `localhost:9092` is available as the Kafka broker.
5. Run the project:
    ```bash
    node server.js
    ```

## **How It Works**
- **Event Streaming**: The system subscribes to Kafka topics (`courses-viewed` and `aptech-testing-one`) to track course views and purchases.
- **Data Processing**: Data from user actions is processed and stored in MongoDB. The system updates user details when they move from unregistered to registered users.
- **Recommendations**: The system aggregates and recommends courses based on user history, course popularity, and most viewed courses.

## **Usage**
- Track user actions like viewing and purchasing courses.
- Serve personalized recommendations based on user history and popular courses.
- Works for both registered and unregistered users using cookies for session management.

## **Contributing**
Feel free to submit a pull request if you'd like to contribute improvements or add new features.

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
