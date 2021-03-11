require "test_helper"

class TonicControllerTest < ActionDispatch::IntegrationTest
  test "should get project" do
    get tonic_project_url
    assert_response :success
  end

  test "should get new" do
    get tonic_new_url
    assert_response :success
  end

  test "should get update" do
    get tonic_update_url
    assert_response :success
  end

  test "should get delete" do
    get tonic_delete_url
    assert_response :success
  end
end
