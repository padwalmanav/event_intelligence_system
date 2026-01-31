import streamlit as st
import pandas as pd
from db.mongo import fetch_users

st.set_page_config(page_title="Users Export", layout="centered")

st.title("📥 Download Users CSV")

response = fetch_users()

if "error" in response:
    st.error(response["error"])
else:
    users_list = response["users"]

    if not users_list:
        st.warning("No users found in database.")
    else:
        df = pd.DataFrame(users_list)

        if "password" in df.columns:
            df = df.drop(columns=["password"])

        st.success(f"Fetched {len(df)} users")

        # st.subheader("👀 Preview")
        # st.table(df.head(10))

        csv_data = df.to_csv(index=False).encode("utf-8")

        st.download_button(
            label="⬇️ Download users as CSV",
            data=csv_data,
            file_name="users.csv",
            mime="text/csv"
        )
