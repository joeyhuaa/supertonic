require "test_helper"

class SongControllerTest < ActionDispatch::IntegrationTest
  test "should get get" do
    get song_get_url
    assert_response :success
  end

  test "should get post" do
    get song_post_url
    assert_response :success
  end

  test "should get update" do
    get song_update_url
    assert_response :success
  end

  test "should get delete" do
    get song_delete_url
    assert_response :success
  end
end
